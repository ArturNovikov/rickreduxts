import { ApiEndpoints } from "../constants/apiEndpoints";

const fetchRickAndMortyCharacter = async (name: string, page: number = 1) => {
    const response = await fetch(`${ApiEndpoints.BASE_URL}/?page=${page}&name=${name}`);
    return response;
}

export { fetchRickAndMortyCharacter };