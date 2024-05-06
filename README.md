# TickerAI

Codebase for the TickerAI.io platform

**TickerAI** - A **Mark Cuban** Company - AI-based Financial Market News Aggregator; a proprietary code, shared to demonstrate Sinisa Rudan's (and his Cha-OS team) development

The code is exemplary. For it to be fully operational external (including proprietary ones) packages are required.
**Colabo.Space** (by Cha-OS.org) provides most of those packages, partially through proprietary **KnAllEdge** ecosystem, including:

- `@colabo-knalledge/b-core` - backend core logics
- `@colabo-knalledge/i-core` - isomorphic (both for frontend and backend) core logic
- `@colabo-knalledge/i-core-services` - isomorphic core services
- `@colabo-rima/b-aaa` - RIMA: Resources and Interests Management Application (Colabo package) / Backend Auth/Autorization
- `@colabo-knalledge/b-storage-mongo` - DB / ORM / Moongose / MongoDB implementation used to provide persistency to TickerAI

Most of the UX code is in `src/frontend/apps/tickerai/src`.
