import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { Fragment } from "react";
import { getBlocks, getPage } from "~/utils/notion.server";
import { Helmet } from "react-helmet";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id!;
  const page = await getPage(id);
  const blocks = await getBlocks(id);
  return { page, blocks };
};

export const Text = ({ text }: { text: any[] }) => {
  if (!text) return null;
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={clsx({
          "bold": bold,
          "code": code,
          "italic": italic,
          "strikethrough": strikethrough,
          "underline": underline,
        })}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? (
          <a href={text.link?.url} target="_blank" rel="noreferrer" style={{ color: "blue" }}>
            {text.content}
          </a>
        ) : text.content}
      </span>
    );
  });
};

const renderNestedList = (block: any) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return (
      <ol className="ol">
        {value.children.map((block: any) => renderBlock(block))}
      </ol>
    );
  }
  return (
    <ul className="ul">
      {value.children.map((block: any) => renderBlock(block))}
    </ul>
  );
};

const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="text-base">
          {/** @ts-expect-error */}
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className="text-xl font-semibold">
          {/** @ts-expect-error */}
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-lg font-semibold">
          {/** @ts-expect-error */}
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-base font-semibold">
          {/** @ts-expect-error */}
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return (
        <ul className="ul">
          {value.children.map((child: any) => renderBlock(child))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol className="ol">
          {value.children.map((child: any) => renderBlock(child))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id} className="text-base">
          {/** @ts-expect-error */}
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case "to_do":
      return (
        <div className="text-base">
          <label htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              disabled
              defaultChecked={value.checked}
            />{" "}
            {/** @ts-expect-error */}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details className="text-base">
          <summary>
            {/** @ts-expect-error */}
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((child: any) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className="childPage">
          <strong className="text-lg font-semibold">{value.title}</strong>
          {block.children.map((child: any) => renderBlock(child))}
        </div>
      );
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} className="hr" />;
    case "quote":
      return (
        <blockquote className="blockquote" key={id}>
          {value.rich_text[0].plain_text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="pre">
          <code className="code_block" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className="file">
            📎 <Link to={src_file}>{lastElementInArray.split("?")[0]}</Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <a
          href={href}
          target="_brank"
          rel="noreferrer"
          className="bookmark text-base"
        >
          {href}
        </a>
      );
    case "table": {
      return (
        <table className="table">
          <tbody>
            {block.children?.map((child: any, i: number) => {
              const RowElement =
                value.has_column_header && i == 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: any, i: number) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        {/** @ts-expect-error */}
                        <Text text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className="row">
          {block.children.map((block: any) => renderBlock(block))}
        </div>
      );
    }
    case "column": {
      return (
        <div>{block.children.map((child: any) => renderBlock(child))}</div>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function WritingId() {
  const { page, blocks } = useLoaderData();
  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <Helmet>
        <title>{page.properties["Page"].title[0].plain_text}</title>
      </Helmet>

      <article className="containern space-y-4">
        <Link to="/writing" className="back">
          ← Return
        </Link>
        <h1 className="name">
          {/** @ts-expect-error */}
          <Text text={page.properties["Page"].title} />
        </h1>
        <section className="space-y-4">
          {blocks.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>
    </div>
  );
}
