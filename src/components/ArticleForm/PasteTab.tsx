import { useArticleStore } from "@/stores/useArticleStore";
import Button from "../Button";
import TextArea from "../TextArea";

export default function PasteTab() {
    const pastedArticle = useArticleStore((state) => state.pastedArticle)
    const setArticleStoreItem = useArticleStore((state) => state.setArticleStoreItem)

    return (
        <div className="relative flex-grow animate__animated animate__fadeIn">
            <TextArea
                placeholder="Paste an article, short or long"
                value={pastedArticle}
                className="pointer-events-auto cursor-auto"
                onChange={(event) => {
                    setArticleStoreItem("pastedArticle", event.target.value)
                    // SplitArticleToSentencesHelper((event), setSentencesArray)
                }}
            // isDisabled={isPlayerOpen ? true : false}
            // disabledTitle="You shouldn't edit the very thing you're listening to, should you?"
            />
            <div className="text-right">
                <Button
                    type="tertiary"
                    className="py-0 pl-4 font-bold"
                    onClick={() => {
                        setArticleStoreItem("pastedArticle", "")
                        // SplitArticleToSentencesHelper(("Text from tab 2" + text), setSentencesArray)
                    }}
                >
                    Clear
                </Button>
            </div>
        </div>
    )
}