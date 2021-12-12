import { BaseElement, Editor } from "slate"
import { createHyperscript } from "slate-hyperscript"

type Element = BaseElement & {
  inline?: boolean
  void?: boolean
}

export const withTest = (editor: Editor) => {
  const { isInline, isVoid } = editor
  editor.isInline = (element: Element) => {
    return !!element.inline ?? isInline(element)
  }
  editor.isVoid = (element: Element) => {
    return !!element.void ?? isVoid(element)
  }
  return editor
}
export const jsx = createHyperscript({
  elements: {
    block: {},
    inline: { inline: true },
  },
})
