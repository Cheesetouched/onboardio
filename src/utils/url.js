export const getQueryParams = () =>
    window.location.search
        .replace("?", "")
        .split("&")
        .reduce(
            (r, e) => ((r[e.split("=")[0]] = decodeURIComponent(e.split("=")[1])), r),
            {}
        );