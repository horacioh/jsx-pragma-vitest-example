/** @jsx jsx */
import { Editor } from "slate"
import { jsx } from "slate-hyperscript"
import { assert, describe, it } from "vitest"
import { withTest } from "./test-utils"

describe("jsx pragma demo", () => {
  it("simple operation test", () => {
    const input = (
      <editor>
        <element>
          <text someKey />
        </element>
      </editor>
    )

    // this is supported for backwards compatibility only; newProperties should omit removed values.
    const operations = [
      {
        type: "set_node",
        path: [0, 0],
        properties: { someKey: true },
        newProperties: { someKey: null },
      },
    ]

    const output = (
      <editor>
        <element>
          <text />
        </element>
      </editor>
    )

    let editor = withTest(input)
    Editor.withoutNormalizing(editor, () => {
      for (const op of operations) {
        editor.apply(op)
      }
    })

    assert.deepEqual(editor.children, output.children)
    assert.deepEqual(editor.selection, output.selection)
  })
})
