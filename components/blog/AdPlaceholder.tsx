// Reusable ad placeholder used in all requested ad positions.
type AdPlaceholderProps = {
  position: string;
};

export default function AdPlaceholder({ position }: AdPlaceholderProps) {
  return (
    <div className="my-6 rounded-md border border-dashed border-[var(--point)] bg-[var(--muted)] p-4 text-center text-sm">
      광고 영역 ({position})
    </div>
  );
}
