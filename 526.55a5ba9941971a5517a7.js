"use strict";
(self["webpackChunkfrontend_performance_basecamp"] = self["webpackChunkfrontend_performance_basecamp"] || []).push([[526],{

/***/ 526:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Search_Search)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(848);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(540);
;// CONCATENATED MODULE: ./src/utils/apiClient.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}
const apiClient = {
    fetch: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(url.toString());
        if (!response.ok) {
            throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
        }
        return response.json();
    }),
    appendSearchParams: (url, params) => {
        const newUrl = new URL(url.toString());
        Object.entries(params).forEach(([key, value]) => {
            newUrl.searchParams.append(key, value);
        });
        return newUrl;
    }
};

;// CONCATENATED MODULE: ./src/apis/gifAPIService.ts
var gifAPIService_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const API_KEY = "Nu0XUgyQ1YBLhViAvSr5DVyMF1VfKNKH";
if (!API_KEY) {
    throw new Error('GIPHY_API_KEY is not set in environment variables');
}
const BASE_URL = 'https://api.giphy.com/v1/gifs';
const DEFAULT_FETCH_COUNT = 16;
const convertResponseToModel = (gifList) => {
    return gifList.map(({ id, title, images }) => {
        return {
            id,
            title: title !== null && title !== void 0 ? title : '',
            imageUrl: images.original.url
        };
    });
};
const fetchGifs = (url) => gifAPIService_awaiter(void 0, void 0, void 0, function* () {
    try {
        const gifs = yield apiClient.fetch(url);
        return convertResponseToModel(gifs.data);
    }
    catch (error) {
        if (error instanceof ApiError) {
            console.error(`API Error: ${error.status} - ${error.message}`);
        }
        else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
});
const gifAPIService = {
    getTrending: () => gifAPIService_awaiter(void 0, void 0, void 0, function* () {
        const url = apiClient.appendSearchParams(new URL(`${BASE_URL}/trending`), {
            api_key: API_KEY,
            limit: `${DEFAULT_FETCH_COUNT}`,
            rating: 'g'
        });
        return fetchGifs(url);
    }),
    searchByKeyword: (keyword, page) => gifAPIService_awaiter(void 0, void 0, void 0, function* () {
        const url = apiClient.appendSearchParams(new URL(`${BASE_URL}/search`), {
            api_key: API_KEY,
            q: keyword,
            limit: `${DEFAULT_FETCH_COUNT}`,
            offset: `${page * DEFAULT_FETCH_COUNT}`,
            rating: 'g',
            lang: 'en'
        });
        return fetchGifs(url);
    })
};

;// CONCATENATED MODULE: ./src/pages/Search/hooks/useGifSearch.tsx
var useGifSearch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const DEFAULT_PAGE_INDEX = 0;
const SEARCH_STATUS = {
    BEFORE_SEARCH: 'BEFORE_SEARCH',
    LOADING: 'LOADING',
    FOUND: 'FOUND',
    NO_RESULT: 'NO_RESULT',
    ERROR: 'ERROR'
};
const useGifSearch = () => {
    const [status, setStatus] = (0,react.useState)(SEARCH_STATUS.BEFORE_SEARCH);
    const [currentPageIndex, setCurrentPageIndex] = (0,react.useState)(DEFAULT_PAGE_INDEX);
    const [gifList, setGifList] = (0,react.useState)([]);
    const [searchKeyword, setSearchKeyword] = (0,react.useState)('');
    const [errorMessage, setErrorMessage] = (0,react.useState)(null);
    const updateSearchKeyword = (e) => {
        setSearchKeyword(e.target.value);
    };
    const resetSearch = () => {
        setStatus(SEARCH_STATUS.LOADING);
        setCurrentPageIndex(DEFAULT_PAGE_INDEX);
        setGifList([]);
        setErrorMessage(null);
    };
    const handleError = (error) => {
        setStatus(SEARCH_STATUS.ERROR);
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    };
    const searchByKeyword = () => useGifSearch_awaiter(void 0, void 0, void 0, function* () {
        resetSearch();
        try {
            const gifs = yield gifAPIService.searchByKeyword(searchKeyword, DEFAULT_PAGE_INDEX);
            if (gifs.length === 0) {
                setStatus(SEARCH_STATUS.NO_RESULT);
                return;
            }
            setGifList(gifs);
            setStatus(SEARCH_STATUS.FOUND);
        }
        catch (error) {
            handleError(error);
        }
    });
    const loadMore = () => useGifSearch_awaiter(void 0, void 0, void 0, function* () {
        const nextPageIndex = currentPageIndex + 1;
        try {
            const newGitList = yield gifAPIService.searchByKeyword(searchKeyword, nextPageIndex);
            setGifList((prevGifList) => [...prevGifList, ...newGitList]);
            setCurrentPageIndex(nextPageIndex);
        }
        catch (error) {
            handleError(error);
        }
    });
    (0,react.useEffect)(() => {
        const fetchTrending = () => useGifSearch_awaiter(void 0, void 0, void 0, function* () {
            if (status !== SEARCH_STATUS.BEFORE_SEARCH)
                return;
            try {
                const gifs = yield gifAPIService.getTrending();
                setGifList(gifs);
            }
            catch (error) {
                handleError(error);
            }
        });
        fetchTrending();
    }, []);
    return {
        status,
        searchKeyword,
        gifList,
        errorMessage,
        searchByKeyword,
        updateSearchKeyword,
        loadMore
    };
};
/* harmony default export */ const hooks_useGifSearch = (useGifSearch);

// EXTERNAL MODULE: ./node_modules/react-icons/ai/index.esm.js + 4 modules
var index_esm = __webpack_require__(393);
;// CONCATENATED MODULE: ./src/pages/Search/components/SearchBar/SearchBar.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const SearchBar_module = ({"searchbarSection":"_yRyLCVW_8BrXNu2Ae1I","searchbarContainer":"p1yl5o1LGzbcgKpLvnzP","searchbarTitle":"tmllUNaCFiCyJ_2LTNUL","searchInput":"XZuzNzJP7hkmuiygaxt6","searchButton":"_HPJ5AEs_c3uawxix3Uk"});
;// CONCATENATED MODULE: ./src/pages/Search/components/SearchBar/SearchBar.tsx



const SearchBar = ({ searchKeyword, onEnter, onChange, onSearch }) => {
    return ((0,jsx_runtime.jsxs)("section", Object.assign({ className: SearchBar_module.searchbarSection }, { children: [(0,jsx_runtime.jsx)("h3", Object.assign({ className: SearchBar_module.searchbarTitle }, { children: "- find the best gif now -" })), (0,jsx_runtime.jsxs)("div", Object.assign({ className: SearchBar_module.searchbarContainer }, { children: [(0,jsx_runtime.jsx)("input", { className: SearchBar_module.searchInput, type: "text", value: searchKeyword, onKeyUp: onEnter, onChange: onChange }), (0,jsx_runtime.jsx)("button", Object.assign({ className: SearchBar_module.searchButton, type: "button", onClick: onSearch }, { children: (0,jsx_runtime.jsx)(index_esm/* AiOutlineSearch */.fUO, { color: "white", size: "2rem" }) }))] }))] })));
};
/* harmony default export */ const SearchBar_SearchBar = (SearchBar);

;// CONCATENATED MODULE: ./src/pages/Search/components/ResultTitle/ResultTitle.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ResultTitle_module = ({"resultTitle":"bMX5kwo8awW0wG6uP_MM"});
;// CONCATENATED MODULE: ./src/pages/Search/components/ResultTitle/ResultTitle.tsx



const ResultTitle = ({ status }) => {
    switch (status) {
        case SEARCH_STATUS.NO_RESULT:
            return ((0,jsx_runtime.jsxs)("h3", Object.assign({ className: ResultTitle_module.resultTitle }, { children: [(0,jsx_runtime.jsx)("span", { children: "Nothing" }), "\uD83E\uDD72"] })));
        case SEARCH_STATUS.BEFORE_SEARCH:
            return ((0,jsx_runtime.jsxs)("h3", Object.assign({ className: ResultTitle_module.resultTitle }, { children: ["\uD83D\uDD25 ", (0,jsx_runtime.jsx)("span", { children: "Trending Now" }), " \uD83D\uDD25"] })));
        case SEARCH_STATUS.ERROR:
            return ((0,jsx_runtime.jsxs)("h3", Object.assign({ className: ResultTitle_module.resultTitle }, { children: [(0,jsx_runtime.jsx)("span", { children: "Something Went Wrong" }), "\uD83E\uDD72"] })));
        default:
            return ((0,jsx_runtime.jsx)("h3", Object.assign({ className: ResultTitle_module.resultTitle }, { children: (0,jsx_runtime.jsx)("span", { children: "We Found..." }) })));
    }
};
/* harmony default export */ const ResultTitle_ResultTitle = (ResultTitle);

;// CONCATENATED MODULE: ./src/pages/Search/components/GifItem/GifItem.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const GifItem_module = ({"gifItem":"d9Kx4D_C6coYB4Bq3Y_D","gifImage":"_qDfMSZFh0Sj5QB2_372","gifTitleContainer":"jmVam4uDiwDe9X0kov9s","gifTitleBg":"bESWa5xgNgk178EbWGcc","gifTitle":"x8ChTAzHTz86NM8umGRm"});
;// CONCATENATED MODULE: ./src/pages/Search/components/GifItem/GifItem.tsx


const GifItem = ({ imageUrl = '', title = '' }) => {
    return ((0,jsx_runtime.jsxs)("div", Object.assign({ className: GifItem_module.gifItem }, { children: [(0,jsx_runtime.jsx)("img", { className: GifItem_module.gifImage, src: imageUrl }), (0,jsx_runtime.jsxs)("div", Object.assign({ className: GifItem_module.gifTitleContainer }, { children: [(0,jsx_runtime.jsx)("div", { className: GifItem_module.gifTitleBg }), (0,jsx_runtime.jsx)("h4", Object.assign({ className: GifItem_module.gifTitle }, { children: title }))] }))] })));
};
/* harmony default export */ const GifItem_GifItem = (GifItem);

;// CONCATENATED MODULE: ./src/pages/Search/components/SearchResult/SearchResult.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const SearchResult_module = ({"searchResultSection":"de2qwsei5MNiz7eV4rNm","gifResultWrapper":"Sk1D0Qs59YRDsSi_PLe_","loadMoreButton":"qrKiKyOk1oFYBTmViAam"});
;// CONCATENATED MODULE: ./src/pages/Search/components/SearchResult/SearchResult.tsx





const SearchResult = ({ status, gifList, loadMore }) => {
    const renderGifList = () => ((0,jsx_runtime.jsx)("div", Object.assign({ className: SearchResult_module.gifResultWrapper }, { children: gifList.map((gif) => ((0,jsx_runtime.jsx)(GifItem_GifItem, { imageUrl: gif.imageUrl, title: gif.title }, gif.id))) })));
    const renderLoadMoreButton = () => ((0,jsx_runtime.jsx)("button", Object.assign({ className: SearchResult_module.loadMoreButton, onClick: loadMore }, { children: "load more" })));
    const renderContent = () => {
        switch (status) {
            case SEARCH_STATUS.FOUND:
                return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [renderGifList(), renderLoadMoreButton()] }));
            case SEARCH_STATUS.BEFORE_SEARCH:
                return renderGifList();
            case SEARCH_STATUS.NO_RESULT:
            case SEARCH_STATUS.ERROR:
            default:
                return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {});
        }
    };
    return ((0,jsx_runtime.jsxs)("section", Object.assign({ className: SearchResult_module.searchResultSection }, { children: [(0,jsx_runtime.jsx)(ResultTitle_ResultTitle, { status: status }), renderContent()] })));
};
/* harmony default export */ const SearchResult_SearchResult = (SearchResult);

// EXTERNAL MODULE: ./node_modules/classnames/bind.js
var bind = __webpack_require__(726);
var bind_default = /*#__PURE__*/__webpack_require__.n(bind);
;// CONCATENATED MODULE: ./src/pages/Search/components/ArtistInfo/ArtistInfo.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const ArtistInfo_module = ({"artistContainer":"WS5RuQ_x18SikZHTRyke","profileImage":"XNLKxvyVOVu8lOJJSdAt","profileUrl":"mdtZcvbaOpN76XOUKbzG"});
;// CONCATENATED MODULE: ./src/pages/Search/components/ArtistInfo/ArtistInfo.tsx


const ArtistInfo = ({ artist }) => {
    const { name, profileUrl, profileImageUrl } = artist;
    return ((0,jsx_runtime.jsxs)("li", Object.assign({ className: ArtistInfo_module.artistContainer }, { children: [(0,jsx_runtime.jsx)("img", { className: ArtistInfo_module.profileImage, src: profileImageUrl }), (0,jsx_runtime.jsx)("p", { children: (0,jsx_runtime.jsx)("a", Object.assign({ className: ArtistInfo_module.profileUrl, href: profileUrl }, { children: name })) })] })));
};
/* harmony default export */ const ArtistInfo_ArtistInfo = (ArtistInfo);

;// CONCATENATED MODULE: ./src/pages/Search/components/ArtistList/ArtistList.tsx


const ArtistList = ({ artists }) => {
    return ((0,jsx_runtime.jsx)("ul", { children: artists.map((artist, index) => {
            return (0,jsx_runtime.jsx)(ArtistInfo_ArtistInfo, { artist: artist }, index);
        }) }));
};
/* harmony default export */ const ArtistList_ArtistList = (ArtistList);

;// CONCATENATED MODULE: ./src/pages/Search/components/HelpPanel/artistUtil.ts
const DUMMY_ARTISTS_LENGTH = 100;
const DUMMY_ARTISTS = [
    {
        name: 'Pola Lucas',
        profileUrl: 'https://giphy.com/polalucas',
        profileImageUrl: 'https://media4.giphy.com/media/gwWAA4PYJLTtyOHkUD/giphy.gif'
    },
    {
        name: 'Yizr',
        profileUrl: 'https://giphy.com/yizr',
        profileImageUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjE3YWc2Ym02aWxrMDVweDRkNHRiZjdtejhxZTNuNGxlYWZqOWx4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UJnRqJWD0KrbW/giphy.webp'
    },
    {
        name: 'YUNGSUNG',
        profileUrl: 'https://giphy.com/yungsung',
        profileImageUrl: 'https://media0.giphy.com/media/lgnOH6bhb1QpUm2k6w/giphy.gif'
    },
    {
        name: 'Kev Lavery',
        profileUrl: 'https://giphy.com/kevlavery',
        profileImageUrl: 'https://media1.giphy.com/media/ZPLluhRJiGwSttn7i2/giphy.gif'
    },
    {
        name: 'Lorna Mills',
        profileUrl: 'https://giphy.com/lornamills',
        profileImageUrl: 'https://media1.giphy.com/media/l0Iyn1gGtCPa3x41a/200.gif'
    }
];
const artists = Array.from({ length: DUMMY_ARTISTS_LENGTH }, (_v, k) => DUMMY_ARTISTS[k % DUMMY_ARTISTS.length]);
const getArtists = () => artists;

;// CONCATENATED MODULE: ./src/pages/Search/components/HelpPanel/HelpPanel.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const HelpPanel_module = ({"floatingButton":"jQBPp9XzUlR0s47cyMvy","selectedItemContainer":"bI_mJt1zrVbU9rgQ8O9a","showSheet":"_xMBJVElyMLYg2be4I3S","sheetTitleContainer":"p259JqbBpFGYE_NkFPXj","sheetContentsContainer":"_4uL_W0scH3KiWMUSa8z"});
;// CONCATENATED MODULE: ./src/pages/Search/components/HelpPanel/HelpPanel.tsx







const cx = bind_default().bind(HelpPanel_module);
const HelpPanel = () => {
    const artists = getArtists();
    const [isShow, setIsShow] = (0,react.useState)(false);
    const openSheet = () => setIsShow(true);
    const closeSheet = () => setIsShow(false);
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("button", Object.assign({ type: "button", className: HelpPanel_module.floatingButton, onClick: openSheet }, { children: (0,jsx_runtime.jsx)(index_esm/* AiOutlineInfo */.RJf, { color: "white", size: "24px" }) })), (0,jsx_runtime.jsxs)("section", Object.assign({ className: cx('selectedItemContainer', {
                    showSheet: isShow
                }) }, { children: [(0,jsx_runtime.jsxs)("div", Object.assign({ className: HelpPanel_module.sheetTitleContainer }, { children: [(0,jsx_runtime.jsx)("h4", { children: "What's all this? " }), (0,jsx_runtime.jsx)("button", Object.assign({ type: "button", onClick: closeSheet }, { children: (0,jsx_runtime.jsx)(index_esm/* AiOutlineClose */.zhF, { size: "24px" }) }))] })), (0,jsx_runtime.jsxs)("div", Object.assign({ className: HelpPanel_module.sheetContentsContainer }, { children: [(0,jsx_runtime.jsx)("img", { src: "https://media0.giphy.com/media/3oKIPdiPGxPI7Dze7u/giphy.gif?cid=ecf05e475f5bct6ci09g3pgn43nf6bausx33fj7f96f6ig92&rid=giphy.gif&ct=g" }), (0,jsx_runtime.jsx)("p", { children: "'memegle' is powered by GIPHY, the top source for the best & newest GIFs & Animated Stickers online. You can find any gif uploaded on GIPHY here." }), (0,jsx_runtime.jsx)("br", {}), (0,jsx_runtime.jsx)("img", { src: "https://giphy.com/static/img/artistdirectory_1040.gif" }), (0,jsx_runtime.jsxs)("p", { children: ["If you want more, you are always welcome to contribute as an artist. Please refer to the guideline\u00A0", (0,jsx_runtime.jsx)("a", Object.assign({ href: "https://support.giphy.com/hc/en-us/articles/360019977552-How-to-Upload" }, { children: "here" })), "\u00A0and upload your work!"] }), (0,jsx_runtime.jsx)("br", {}), (0,jsx_runtime.jsx)("p", { children: "Here are some artists you can refer to." }), (0,jsx_runtime.jsx)("br", {}), (0,jsx_runtime.jsx)("section", { children: (0,jsx_runtime.jsx)(ArtistList_ArtistList, { artists: artists }) })] }))] }))] }));
};
/* harmony default export */ const HelpPanel_HelpPanel = (HelpPanel);

;// CONCATENATED MODULE: ./src/pages/Search/Search.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const Search_module = ({"searchContainer":"OXPtcxG6dhJUUZLVn9IN","searchbarSection":"_NVurYTpiByfxlisvpzR","searchbarContainer":"_IBmZT37YgXzAkcOC_ok","searchbarTitle":"emmqCq0u8mPloc40zVmg","searchInput":"AIq4k7cZS1EdCykvp5UL","searchButton":"_FmPgcKZk2dzVoB60gPV","searchIcon":"somzxAx_KoUk4uhEaNQ6","searchResultSection":"CNXgYCzg4EJ6YGYjz5yr","resultTitle":"NNemcyhYzsoUl3coudLV","gifResultWrapper":"P7wROLtiW0M4yQTzvq4W","loadMoreButton":"eod4_bWPbqsZatbh_Wd3"});
;// CONCATENATED MODULE: ./src/pages/Search/Search.tsx






const Search = () => {
    const { status, searchKeyword, gifList, searchByKeyword, updateSearchKeyword, loadMore } = hooks_useGifSearch();
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            searchByKeyword();
        }
    };
    return ((0,jsx_runtime.jsxs)("div", Object.assign({ className: Search_module.searchContainer }, { children: [(0,jsx_runtime.jsx)(SearchBar_SearchBar, { searchKeyword: searchKeyword, onEnter: handleEnter, onChange: updateSearchKeyword, onSearch: searchByKeyword }), (0,jsx_runtime.jsx)(SearchResult_SearchResult, { status: status, gifList: gifList, loadMore: loadMore }), (0,jsx_runtime.jsx)(HelpPanel_HelpPanel, {})] })));
};
/* harmony default export */ const Search_Search = (Search);


/***/ })

}]);
//# sourceMappingURL=526.55a5ba9941971a5517a7.js.map