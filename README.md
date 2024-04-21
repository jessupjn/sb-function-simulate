# sb-function-simulate

### Set up

Clone the repo and install dependencies

```bash
❯ gh repo clone jessupjn/sb-function-simulate
❯ bun i
```

### Run a simulation

In `./src/index.ts`, modify the `CLUSTER`, `FUNCTION_PUBKEY`, and `REQUEST_PUBKEY` parameters to your specifications.

Then you are all set to trigger a simulation:

```bash
bun run simulate
```
