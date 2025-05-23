import { GroupBase } from "react-select";

interface MultiSelectGroup {
  group_name: string;
  group_options: string[];
}

export interface OptionType {
  value: string;
  label: string;
}

interface GroupedOptionType<T> extends GroupBase<T> {
  label: string;
  options: T[];
}

const movieAndShowGenres: MultiSelectGroup = {
  group_name: "Movies and Shows",
  group_options: [
    "Action",
    "Adventure",
    "Animation",
    "Anthology",
    "Apocalyptic",
    "Biography",
    "Bollywood",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Musical",
    "Mystery",
    "Political",
    "Romance",
    "Science Fiction",
    "Sitcom",
    "Space",
    "Sport",
    "Superhero",
    "Supernatural",
    "Thriller",
    "War",
    "Western",
  ],
};
const bookGenres: MultiSelectGroup = {
  group_name: "Books",
  group_options: [
    "Action",
    "Adventure",
    "Apocalyptic",
    "Biography",
    "Children",
    "Classics",
    "Comic",
    "Crime",
    "Drama",
    "Fantasy",
    "Graphic Novel",
    "Historical Fiction",
    "Horror",
    "Humor",
    "Memoir",
    "Mystery",
    "Non-Fiction",
    "Novella",
    "Poetry",
    "Romance",
    "Science Fiction",
    "Self-Help",
    "Thriller",
    "Young Adult",
  ],
};
const gameGenres: MultiSelectGroup = {
  group_name: "Games",
  group_options: [
    "Action",
    "Adventure",
    "Arcade",
    "Base Building",
    "Board Game",
    "Card Game",
    "Casual",
    "Cyberpunk",
    "Endless Runner",
    "Farming",
    "Fighting",
    "Flash",
    "Indie",
    "MMO",
    "MOBA",
    "Mobile",
    "Party",
    "Platformer",
    "Puzzle",
    "Racing",
    "RTS",
    "RPG",
    "Rogue-like",
    "Simulation",
    "Sandbox",
    "Shooter",
    "Sports",
    "Space",
    "Strategy",
    "Survival",
    "Tower Defence",
  ],
};

const musicGenres: MultiSelectGroup = {
  group_name: "Music",
  group_options: [
    "Blues",
    "Clasical",
    "Country",
    "Hip Hop",
    "Instrumental",
    "Metal",
    "Orchestral",
    "Rock",
    "Soundtrack",
  ],
};

const transformToGroupedOptionType = (
  group: MultiSelectGroup,
): GroupedOptionType<OptionType> => ({
  label: group.group_name,
  options: group.group_options.map((option) => ({
    value: option,
    label: option,
  })),
});

const groupedGenreOptions: GroupedOptionType<OptionType>[] = [
  transformToGroupedOptionType(bookGenres),
  transformToGroupedOptionType(movieAndShowGenres),
  transformToGroupedOptionType(gameGenres),
  transformToGroupedOptionType(musicGenres),
];

export default groupedGenreOptions;
