import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { execSync } from 'child_process';

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

const commands = [
  new SlashCommandBuilder()
    .setName('scan')
    .setDescription('Run fast Kali network scan')
    .addStringOption(o => o.setName('target').setDescription('IP/CIDR to scan').setRequired(true)),
  new SlashCommandBuilder()
    .setName('report')
    .setDescription('Post last scan as formatted GT report')
];

async function registerCommands() {
  if (!TOKEN || !GUILD_ID) return;
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID!, GUILD_ID), { body: commands });
}

let lastScanOutput = '';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log('[ScanBot] Ready');
  registerCommands().catch(() => {});
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'scan') {
    await interaction.deferReply({ ephemeral: true });
    const target = interaction.options.getString('target', true);
    try {
      const out = execSync(`nmap -T4 -F --open ${target}`, { encoding: 'utf8', timeout: 120000 });
      lastScanOutput = out;
      const embed = new EmbedBuilder()
        .setTitle('Scan Complete')
        .setDescription(`\`\`\`\n${out.slice(0, 3500)}\n\`\`\``)
        .setColor(0x2ecc71);
      await interaction.editReply({ embeds: [embed] });
    } catch (e: any) {
      await interaction.editReply({ content: 'Scan failed: ' + (e.message || 'unknown error') });
    }
  }

  if (interaction.commandName === 'report') {
    await interaction.deferReply();
    if (!lastScanOutput) {
      await interaction.editReply('No scan results available.');
      return;
    }
    const report = formatGTReport(lastScanOutput);
    const embed = new EmbedBuilder()
      .setTitle('GT REPORT')
      .setDescription(`\`\`\`\n${report}\n\`\`\``)
      .setColor(0x3498db);
    await interaction.editReply({ embeds: [embed] });
  }
});

function formatGTReport(nmapOutput: string): string {
  const lines = nmapOutput.split('\n');
  const openPorts = lines.filter(l => l.includes('open')).slice(0, 20).join('\n');
  return `SHIFT REPORT\n${new Date().toISOString()}\n\nOPEN PORTS\n${openPorts || 'None detected'}\n\nRT IMPLICATIONS\nTightened controls possible.`;
}

export async function startScanBot() {
  if (!TOKEN) return;
  await client.login(TOKEN);
}