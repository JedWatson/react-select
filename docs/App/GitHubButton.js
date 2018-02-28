/*
This is an slightly-adapted version of the unofficial GitHub Buttons script,
Copyright (c) 2018, なつき
See https://github.com/ntkme/github-buttons
*/

import React from 'react';
import ReactDOM from 'react-dom';

const { document, encodeURIComponent, Math } = window;

const createElement = tag => document.createElement(tag);

const uuid = 'faa75404-3b97-5585-b449-4bc51338fbd1';

const baseURL =
  (/^http:/.test(document.location) ? 'http' : 'https') +
  '://buttons.github.io/';

const parseOptions = anchor => {
  const options = {
    href: anchor.href,
    title: anchor.title,
    'aria-label': anchor.getAttribute('aria-label'),
  };
  ['icon', 'text', 'size', 'show-count'].forEach(i => {
    let attribute = `data-${i}`;
    options[attribute] = anchor.getAttribute(attribute);
  });
  if (options['data-text'] == null) {
    options['data-text'] = anchor.textContent || anchor.innerText;
  }
  return options;
};

const stringifyQueryString = obj => {
  const params = [];
  for (let name in obj) {
    const value = obj[name];
    if (value != null) {
      params.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
    }
  }
  return params.join('&');
};

const onEvent = (target, eventName, func) => {
  if (target.addEventListener) {
    target.addEventListener('' + eventName, func);
  } else {
    target.attachEvent('on' + eventName, func);
  }
};

const onceEvent = (target, eventName, func) => {
  const callback = event => {
    if (target.removeEventListener) {
      target.removeEventListener('' + eventName, callback);
    } else {
      target.detachEvent('on' + eventName, callback);
    }
    return func(event);
  };
  onEvent(target, eventName, callback);
};

const devicePixelRatio = window.devicePixelRatio || 1;

const ceilPixel = px =>
  (devicePixelRatio > 1
    ? Math.ceil(Math.round(px * devicePixelRatio) / devicePixelRatio * 2) / 2
    : Math.ceil(px)) || 0;

const getFrameContentSize = iframe => {
  const contentDocument = iframe.contentWindow.document;
  const html = contentDocument.documentElement;
  const body = contentDocument.body;
  let width = html.scrollWidth;
  let height = html.scrollHeight;
  if (body.getBoundingClientRect) {
    const display = body.style.display;
    body.style.display = 'inline-block';
    const boundingClientRect = body.getBoundingClientRect();
    width = Math.max(
      width,
      ceilPixel(
        boundingClientRect.width ||
          boundingClientRect.right - boundingClientRect.left
      )
    );
    height = Math.max(
      height,
      ceilPixel(
        boundingClientRect.height ||
          boundingClientRect.bottom - boundingClientRect.top
      )
    );
    body.style.display = display;
  }
  return [width, height];
};

const setFrameSize = (iframe, size) => {
  iframe.style.width = size[0] + 'px';
  iframe.style.height = size[1] + 'px';
};

export const render = function(targetNode, options) {
  if (targetNode == null) {
    return renderAll();
  }
  if (options == null) {
    options = parseOptions(targetNode);
  }
  const hash = '#' + stringifyQueryString(options);
  const iframe = createElement('iframe');
  const ref = {
    allowtransparency: true,
    scrolling: 'no',
    frameBorder: 0,
  };
  for (let name in ref) {
    iframe.setAttribute(name, ref[name]);
  }
  setFrameSize(iframe, [1, 0]);
  iframe.style.border = 'none';
  iframe.src = 'javascript:0';
  if (options.title) {
    iframe.title = options.title;
  }
  document.body.appendChild(iframe);
  const onload = function() {
    const size = getFrameContentSize(iframe);
    iframe.parentNode.removeChild(iframe);
    onceEvent(iframe, 'load', function() {
      setFrameSize(iframe, size);
    });
    iframe.src = baseURL + 'buttons.html' + hash;
    targetNode.parentNode.replaceChild(iframe, targetNode);
  };
  onceEvent(iframe, 'load', function() {
    const contentWindow = iframe.contentWindow;
    if (contentWindow.$) {
      contentWindow.$ = onload;
    } else {
      onload();
    }
  });
  const contentDocument = iframe.contentWindow.document;
  contentDocument
    .open()
    .write(
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
        uuid +
        '</title><link rel="stylesheet" href="' +
        baseURL +
        'assets/css/buttons.css"><script>document.location.hash = "' +
        hash +
        '";</script></head><body><script src="' +
        baseURL +
        'buttons.js"></script></body></html>'
    );
  contentDocument.close();
};

export class GitHubButton extends React.Component {
  render() {
    return (
      <span>
        <a {...this.props} style={{ visibility: 'hidden' }} />
      </span>
    );
  }
  componentDidMount() {
    render((this._ = ReactDOM.findDOMNode(this).firstChild));
  }
  componentWillUpdate() {
    ReactDOM.findDOMNode(this).replaceChild(
      this._,
      ReactDOM.findDOMNode(this).firstChild
    );
  }
  componentDidUpdate() {
    render((this._ = ReactDOM.findDOMNode(this).firstChild));
  }
}
