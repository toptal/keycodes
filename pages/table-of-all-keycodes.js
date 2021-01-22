import { keyCodeEvents, keyCodes } from '../lib/keycodes';

export default function TableOfAllCodes() {
  const keyArray = Object.values(keyCodeEvents).filter((x) => x);
  console.log(keyArray);
  return (
    <div>
      <p>This is a table of all Key Codes and their associated data</p>
      <table className="table">
        <thead>
          <tr>
            <th>Key Code</th>
            <th>Key</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {keyArray.map((key) => (
            <tr key={key.keyCode}>
              <td>{key.keyCode}</td>
              <td>{key.key}</td>
              <td>{key.code}</td>
              <td>TODO</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
