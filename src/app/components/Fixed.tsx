"use client";

interface FixedProps {
  text?: string;
}

export const Fixed = ({ text }: FixedProps) => {
  return (
    <textarea
      disabled={!!text}
      readOnly={!text}
      className="rounded border border-solid border-black transition-colors px-4"
      value={text}
      rows={6}
      cols={50}
    />
  );
};
