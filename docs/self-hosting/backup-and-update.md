---
title: Backup, update and restore
description: Verified release updates, rollback and explicit disaster recovery.
---

# Backup, update and restore

## Backup

```bash
./scenelith backup
```

The launcher briefly quiesces application writers, creates a PostgreSQL custom-format dump, archives local media and records checksums plus release metadata. The deployment `.env` and its secrets are never copied. S3-compatible media remains in operator-owned object storage and needs its own versioning/snapshot policy.

Keep a separate encrypted escrow of the environment values needed for recovery. In particular, a database restored on another host needs the original `AUTOMATION_CREDENTIAL_ENCRYPTION_KEY` (or matching key ring) to decrypt saved Automation credentials. Provider and storage credentials must also be restored separately; never place this secret copy inside an unencrypted application backup.

Keep encrypted backups off the application host.

## Update

```bash
./scenelith update
./scenelith update 1.2.3
```

The updater verifies the release archive and internal manifest, creates a backup, preserves the environment/volumes, installs only allowlisted deployment files, pulls the pinned image, applies ordered migrations and waits for health. If the new stack does not become healthy, it restores the prior deployment files and image.

Applied migrations are expand-only. Never edit an already-applied migration.

## Restore

Restore is deliberately explicit and destructive to the current database/local media:

```bash
./scenelith restore --from /absolute/path/to/scenelith-backup --confirm
```

The command verifies every checksum, stops writers, replaces the database and local media, then starts the full stack. Test restore on a separate host before treating backups as a production recovery plan.

## Operations checklist

- Monitor `/api/health/ready` and container health.
- Alert on host disk usage when using local media.
- Keep provider-side budget/rate limits.
- Back up before every upgrade.
- Keep off-host object-store recovery independent from database backup.
