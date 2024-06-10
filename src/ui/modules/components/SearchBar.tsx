import { Typography } from "../../design-system/typography/Typography";

interface Props {
  onChangeSearch: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

export default function SearchBar({ onChangeSearch, placeholder = "" }: Props) {
  return (
    <Typography component="div" variant="caption1">
      <input
        type="search"
        name="search"
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChangeSearch}
        className="w-[300px] max-md:text-caption2 max-sm:text-caption3 p-3 font-light border border-gray-500 rounded focus:outline-none focus:ring-1 dark:text-primary-200 dark:bg-gray-800 placeholder-gray-700 dark:placeholder-gray-500/80"
      />
    </Typography>
  );
}
