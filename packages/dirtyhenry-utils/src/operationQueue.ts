type Operation<Context> = {
  run: (context: Context) => Promise<void>;
};

type OperationQueueProps<Context> = {
  operations: Operation<Context>[];
  warmUp: () => Context;
  coolDown: (context: Context) => void;
  retries?: number;
};

async function runSequentiallyOnce<C>(operations: Operation<C>[], context: C) {
  const successes = [];
  const failures = [];

  for (const operation of operations) {
    try {
      await operation.run(context);
      successes.push(operation);
    } catch (error) {
      console.error(`Operation failed.`, operation, error);
      failures.push(operation);
    }
  }

  return { successes, failures };
}

export async function runSequentially<C>({
  operations,
  warmUp,
  coolDown,
  retries = 0,
}: OperationQueueProps<C>) {
  let iteration = 0;
  let operationsToRun = operations;

  const context = warmUp();

  const finalSuccesses = [];
  const finalFailures = [];

  do {
    const { successes, failures } = await runSequentiallyOnce(
      operationsToRun,
      context
    );
    finalSuccesses.push(successes);
    operationsToRun = failures;
    iteration += 1;
  } while (iteration < 1 + retries && operationsToRun.length > 0);
  finalFailures.push(operationsToRun);

  coolDown(context);

  return { successes: finalSuccesses, failures: finalFailures };
}
