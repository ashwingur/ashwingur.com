import { GroupBase } from "react-select";

interface GenreOption {
  value: string;
  label: string;
}

interface MultiSelectGroup {
  group_name: string;
  group_options: string[];
}

interface OptionType {
  value: string;
  label: string;
}

interface GroupedOptionType<T> extends GroupBase<T> {
  label: string;
  options: T[];
}

const movieAndShowGenres: MultiSelectGroup = {
  group_name: "Movies and Shows",
  group_options: ["Action", "Adventure", "Comedy"],
};
const bookGenres: MultiSelectGroup = {
  group_name: "Books",
  group_options: ["Fantasy", "Adventure", "Comedy"],
};
const musicGenres: MultiSelectGroup = {
  group_name: "Books",
  group_options: ["Soundtrack", "Orchestral"],
};

const transformToGroupedOptionType = (
  group: MultiSelectGroup
): GroupedOptionType<OptionType> => ({
  label: group.group_name,
  options: group.group_options.map((option) => ({
    value: option,
    label: option,
  })),
});

const groupedGenreOptions: GroupedOptionType<OptionType>[] = [
  transformToGroupedOptionType(movieAndShowGenres),
  transformToGroupedOptionType(bookGenres),
  transformToGroupedOptionType(musicGenres),
];

export default groupedGenreOptions;
