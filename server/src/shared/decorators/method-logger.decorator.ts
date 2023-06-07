import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';

export function MethodLogger() {
  return (
    target: any,
    methodName: string,
    descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>,
  ) => {
    const objectName = target?.constructor?.name
      ? target?.constructor?.name + '.'
      : '';
    const displayedName = objectName + methodName;
    const logger = new Logger('MethodLogger');

    const originalFunction = descriptor.value;
    const callId = uuidv4();

    descriptor.value = async function () {
      const start = new Date();
      logger.log(
        `Started method ${displayedName} at ${start.toISOString()} [id=${callId}]`,
      );
      const result = await originalFunction!.apply(this, arguments);
      const dur = (Date.now() - start.getTime()) / 1000;
      logger.log(`Finished method ${displayedName} in ${dur}s [id=${callId}]`);
      return result;
    };
  };
}
