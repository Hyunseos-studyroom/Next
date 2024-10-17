import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Not authenticated");
        }

        const documents = await ctx.db.query("document").collect();

        return documents;
    }
})

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