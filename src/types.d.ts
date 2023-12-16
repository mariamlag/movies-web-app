interface Thumbnail {
  trending: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
}

interface LabelProps {
  hasError?: boolean;
}
interface InputsProps {
  hasError?: boolean;
}
interface Movie {
  title: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

interface MoviesProps {
  movies: Movie[];
}
interface InputsProps {
  type: string;
  placeholder: string;
  name: string;
  id: string;
  // Other props...

  // Define the ref prop with the correct type
  ref?: Ref<HTMLInputElement>;
}
