export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer>
      <hr className="bg-[#c5c0b8] h-[1px] w-full" />
      <div className="mt-4">
        <p className="flex flex-row text-[#c5c0b8] font-mono text-center lg:px-12 justify-between">
          <span> rcn.sh © 2024 </span>
          {children}
        </p>
      </div>
    </footer>
  );
}