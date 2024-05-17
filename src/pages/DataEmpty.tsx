import { Typography } from "../ui/design-system/typography/Typography";

export default function DataEmpty() {
  return (
    <div className="flex flex-col items-center justify-end gap-3 pb-3">
      <div className="w-[474px] h-[363px]">
        <img
          src="/assets/svg/data-empty.svg"
          alt="Illustration des donneés vides"
        />
      </div>
      <Typography variant="lead" component="h1" className="text-center">
        Aucune données n'a été trouvée dans la base de données ! ! !
      </Typography>
    </div>
  );
}
