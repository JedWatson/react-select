import React from 'react';
import { Link } from 'react-router-dom';
import * as examples from '../examples';

let examplesRoutes = {};

let links = [];

for (let name in examples) {
  let Component = examples[name];
  let link = `/example/${name}`;
  examplesRoutes[link] = Component;
  links.push({ link, name });
}

const ExamplesIndex = () => (
  <ul>
    {links.map(({ link, name }) => (
      <li key={link}>
        <Link to={link}>{name}</Link>
      </li>
    ))}
  </ul>
);

examplesRoutes['/example'] = ExamplesIndex;

export default examplesRoutes;
