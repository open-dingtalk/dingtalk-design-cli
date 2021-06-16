import { ICommandConfig, PlainRecord, } from '../../lib/common/types';


/**
 * A function used to add type to plugin constructor.
 *
 *   - CO: CommandOptions
 */
export default function CommandWrapper<
 CO extends PlainRecord = PlainRecord
 >(config: ICommandConfig<CO>): ICommandConfig<CO> {
  return config;
}