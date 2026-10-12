import { cn } from '@/lib/utils';

export function Candle({
  color,
  bodyH,
  topW,
  botW,
  offset,
}: {
  color: string;
  bodyH: string;
  topW: string;
  botW: string;
  offset: string;
}) {
  const isBull = color === 'bull';
  const isBear = color === 'bear';

  return (
    <div className={cn('flex flex-col items-center w-8', offset)}>
      <div className={cn('w-[2px]', topW, isBull ? 'bg-green-500' : isBear ? 'bg-red-500' : 'bg-zinc-500')} />
      <div className={cn('w-4 shadow-sm', bodyH, isBull ? 'bg-green-500' : isBear ? 'bg-red-500' : 'bg-zinc-500')} />
      <div className={cn('w-[2px]', botW, isBull ? 'bg-green-500' : isBear ? 'bg-red-500' : 'bg-zinc-500')} />
    </div>
  );
}

// Re-export full 28-pattern curriculum, groups, reading rules and types from patternsData.ts
export * from './patternsData';
