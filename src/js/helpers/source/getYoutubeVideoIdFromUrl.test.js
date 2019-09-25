import { getYoutubeVideoIdFromUrl } from "./getYoutubeVideoIdFromUrl";

const id = '13jkljdf0923jf';
const url = 'https://www.youtube.com/watch?v=' + id;

test('getting youtube video Id from url', () => {
    expect(getYoutubeVideoIdFromUrl(url)).toEqual(id);
});
