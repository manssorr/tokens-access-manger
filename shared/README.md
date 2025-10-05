# Shared Code

This directory contains TypeScript code shared between client and server.

## Important Notes

**This is NOT a compiled package** - it contains source `.ts` files only.

### Usage

- **Client**: Imports directly from `../../../shared/` (TypeScript compiles it)
- **Server**: Uses a copy in `server/src/shared/` due to TypeScript's `rootDir` limitation

### Maintenance

⚠️ **Code is duplicated!** When updating shared code:

1. Update `/shared/constants.ts` or `/shared/utils.ts`
2. Copy changes to `/server/src/shared/` manually

### For Production

Consider these improvements:
- Convert to proper npm workspace/monorepo (pnpm workspaces)
- Create a separate `@myapp/shared` package
- Use symlinks (Unix-based systems)
- Use path mapping in both tsconfig files

For this trial task, the simple duplication approach is acceptable.
