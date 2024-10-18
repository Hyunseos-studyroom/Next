import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {NormalizeError} from "next/dist/shared/lib/utils";
import {Id} from "./_generated/dataModel";

export const archive = mutation({
    args: {
        id: v.id("document")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);
        if (!existingDocument) {
            throw new NormalizeError("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthrized");
        }

        const recursiveArchive = async (documentId: Id<"document">)=> {
            const children = await ctx.db
                .query("document")
                .withIndex("by_user_parent", (q) => (
                    q
                        .eq("userId", userId)
                        .eq("parentDocument", documentId)
                ))
                .collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchied: true,
                })

                await recursiveArchive(child._id);
            }
        }
        const document = await ctx.db.patch(args.id, {
            isArchied: true,
        });

        recursiveArchive(args.id);

         return document;
    }
})

// @ts-ignore
export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("document"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const document = await ctx.db
            .query("document")
            .withIndex("by_user_parent", (q) =>
            q
                .eq("userId", userId)
                .eq("parentDocument", args.parentDocument)
            )
            .filter((q) => q.eq(q.field("isArchied"), false)
            )
            .order("desc")
            .collect();

        return document
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("document"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const document = await ctx.db.insert("document", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchied: false,
            isPublished: false,
        });

        return document;
    }
})