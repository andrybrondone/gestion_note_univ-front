import { Typography } from "../../design-system/typography/Typography";

interface Props {
  onChangeParcours: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
}

const parcours = ["IG", "GBD", "ASR", "OCC", "GID"];

export default function TrieParParcours({ onChangeParcours, label }: Props) {
  return (
    <Typography component="div" variant="caption1">
      <div className="flex items-center gap-5">
        {label}
        {parcours.map((parcours) => (
          <div key={parcours}>
            <label htmlFor={parcours}>{parcours} </label>
            <input
              type="radio"
              name="parcours"
              id={parcours}
              value={parcours}
              onChange={onChangeParcours}
              defaultChecked={parcours === "IG"}
            />
          </div>
        ))}
      </div>
    </Typography>
  );
}
