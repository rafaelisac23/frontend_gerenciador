type Props = {
  title: string;
  value: number | undefined;
};
export const MenuCard = ({ title, value }: Props) => {
  return (
    <div className="w-[250px] h-[100px] bg-indigo-800 flex flex-col items-center gap-2 p-3 rounded-md shadow-lg shadow-black/50">
      <h1 className="text-lg">{title}</h1>
      <p className="text-3xl">{value ?? "--"}</p>
    </div>
  );
};
