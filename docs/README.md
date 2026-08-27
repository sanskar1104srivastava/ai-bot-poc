# Sahai feature reference → knowledge base

`sahai-features.html` is the source of truth for what the avatar knows about the Sahai HIMS product.
`sahai-features.pdf` is a build artifact — never edit it directly.

```bash
bash scripts/build-features-pdf.sh
```

Renders with whichever Chrome/Chromium/Edge is installed. No dependency to add.

## Slide markers

Each `<h2>` carries a visible `[slide:<id>]` tag, e.g. `[slide:abha]`. This has to be *printed text* —
Bedrock ingests the PDF's extracted text, so an HTML attribute or a comment would be lost.

The markers are what tie speech to screen:

1. The agent calls `search_knowledge_base`.
2. Bedrock returns matching chunks; the chunk carries its section's marker.
3. `search_knowledge_base` reads the marker off the best chunk and pushes that slide to the kiosk, so
   the screen illustrates the fact actually being used — not the model's guess at the topic.
4. Every marker is stripped before the text reaches the LLM, so the agent can never read
   "[slide:abha]" out loud.

Slide ids must match `SLIDE_IDS` in `frontend/lib/slides.ts` and in `backend/src/agent.py`.
`backend/tests/test_show_slide.py` fails if the doc, the deck, or the tool enum drift apart — run
`uv run pytest` after editing any of the three.

## Uploading to Bedrock

Not automated here: the current AWS identity is denied `bedrock:ListDataSources`, and
`KNOWLEDGE_BASE_ID` is empty in `backend/.env.local`, so the agent's `search_knowledge_base` currently
returns "Knowledge base is not available right now" and it answers from the fallback notes in its
prompt instead.

To wire it up:

1. Rebuild the PDF (above).
2. Upload it to the S3 bucket configured as the knowledge base's data source, replacing the previous
   version.
3. Start an ingestion job for that data source and wait for it to finish.
4. Set `KNOWLEDGE_BASE_ID` in `backend/.env.local` (and in the deployed agent's environment).
5. Confirm with a question whose answer only exists in this document — the avatar should answer from
   it *and* the matching slide should appear.
