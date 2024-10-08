import { Typography } from "../../design-system/typography/Typography";

interface Props {
  onChangeNiveau: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  selectedNiveau?: string;
}

const niveau = ["L1", "L2", "L3", "M1", "M2"];

export default function TrieParNiveau({
  onChangeNiveau,
  label,
  selectedNiveau = "",
}: Props) {
  return (
    <Typography component="div" variant="caption1">
      <div className="flex items-center gap-5">
        {label}
        {niveau.map((niveau) => (
          <div key={niveau}>
            <label htmlFor={niveau}>{niveau} </label>
            <input
              type="radio"
              name="niveau"
              id={niveau}
              value={niveau}
              onChange={onChangeNiveau}
              defaultChecked={
                selectedNiveau === ""
                  ? niveau === "L1"
                  : niveau === selectedNiveau
              }
            />
          </div>
        ))}
      </div>
    </Typography>
  );
}
