declare module 'react-markings' {
  import React from 'react';
  import CommonmarkReactRenderer from 'commonmark-react-renderer';

  namespace md {
    export type CommonProps = CommonmarkReactRenderer.CommonProps;
    export type HtmlInlineBlockProps = CommonmarkReactRenderer.HtmlInlineBlockProps;
    export type CodeBlockProps = CommonmarkReactRenderer.CodeBlockProps;
    export type CodeProps = CommonmarkReactRenderer.CodeProps;
    export type HeadingProps = CommonmarkReactRenderer.HeadingProps;
    export type SoftBreakProps = CommonmarkReactRenderer.SoftBreakProps;
    export type LinkProps = CommonmarkReactRenderer.LinkProps;
    export type ImageProps = CommonmarkReactRenderer.ImageProps;
    export type ListProps = CommonmarkReactRenderer.ListProps;
    export type Renderers = CommonmarkReactRenderer.Renderers;
    interface Options {
      renderers?: Partial<Renderers>;
    }

    export type Markings = (
      ...strings: (TemplateStringsArray | React.ReactElement)[]
    ) => React.ReactElement;
    export type Customize = (opts: Options) => Markings;
  }

  interface md {
    (
      ...strings: (TemplateStringsArray | React.ReactElement)[]
    ): React.ReactElement;
    customize: md.Customize;
  }

  const md: md;

  export = md;
}
