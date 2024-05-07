import clsx from "clsx";
import { RiPencilFill } from "react-icons/ri";

interface Props {
  title: string;
  value: string | undefined;
  classNameIcon?: string;
}

export default function RowsTr({ title, value, classNameIcon }: Props) {
  return (
    <tr className="dark:text-white">
      <th className="text-start w-[400px] py-4 px-4">{title}</th>
      <td className="w-[400px]">{value}</td>
      <td className={clsx("w-8", classNameIcon)}>
        <RiPencilFill className="text-alert-warning cursor-pointer text-2xl" />
      </td>
    </tr>
  );
}
