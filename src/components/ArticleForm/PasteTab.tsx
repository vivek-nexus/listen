import { useArticleStore } from "@/stores/useArticleStore";
import Button from "../Button";
import TextArea from "../TextArea";
import { usePlayerStore } from "@/stores/usePlayerStore";

export default function PasteTab() {
    const pastedArticle = useArticleStore((state) => state.pastedArticle)
    const setArticleStoreStringItem = useArticleStore((state) => state.setArticleStoreStringItem)

    const isPlayerOpen = usePlayerStore((state) => state.isPlayerOpen)

    return (
        <div className="relative flex-grow animate__animated animate__fadeIn">
            <TextArea
                placeholder="Paste an article, short or long"
                value={pastedArticle}
                className="pointer-events-auto cursor-auto"
                onChange={(event) => {
                    setArticleStoreStringItem("pastedArticle", event.target.value)
                    // SplitArticleToSentencesHelper((event), setSentencesArray)
                }}
                isDisabled={isPlayerOpen ? true : false}
                toolTipText="Close player to edit"
                toolTipPosition="bottom-left"
            />
            <div className="text-right">
                <Button
                    type="tertiary"
                    className="py-0 pl-4 font-bold"
                    onClick={() => {
                        setArticleStoreStringItem("pastedArticle", "")
                        // SplitArticleToSentencesHelper(("Text from tab 2" + text), setSentencesArray)
                    }}
                >
                    Clear
                </Button>
            </div>
        </div>
    )
}