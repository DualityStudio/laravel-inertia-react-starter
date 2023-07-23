const useAsset = () => {
    const image = (path) => `${window.assetUrl}${path}`;

    return {
        image,
    };
};

export default useAsset;
