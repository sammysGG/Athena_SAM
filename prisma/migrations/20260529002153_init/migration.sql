-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "affiliation" TEXT,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "postCount" INTEGER NOT NULL DEFAULT 0,
    "signature" TEXT,
    "avatarUrl" TEXT,
    "location" TEXT,
    "pgpKeyId" TEXT,
    "lastSeenAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 100,
    "icon" TEXT,
    "restricted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "tag" TEXT,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "lastReplyAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReplyBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Thread_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Thread_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "threadId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "imageUrl" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PrivateMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PrivateMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PrivateMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codename" TEXT NOT NULL,
    "codenameEn" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "summaryEn" TEXT NOT NULL,
    "targetCountry" TEXT,
    "targetSector" TEXT,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "threadId" TEXT,
    "coClaimants" TEXT,
    "claimedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Thread_slug_key" ON "Thread"("slug");

-- CreateIndex
CREATE INDEX "Thread_categoryId_lastReplyAt_idx" ON "Thread"("categoryId", "lastReplyAt");

-- CreateIndex
CREATE INDEX "Thread_pinned_lastReplyAt_idx" ON "Thread"("pinned", "lastReplyAt");

-- CreateIndex
CREATE INDEX "Post_threadId_createdAt_idx" ON "Post"("threadId", "createdAt");

-- CreateIndex
CREATE INDEX "PrivateMessage_receiverId_createdAt_idx" ON "PrivateMessage"("receiverId", "createdAt");

-- CreateIndex
CREATE INDEX "Operation_claimedAt_idx" ON "Operation"("claimedAt");
