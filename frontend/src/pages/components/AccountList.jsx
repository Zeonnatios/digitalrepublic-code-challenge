import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './CardAccount';
import { getStorage } from '../../helpers/Storage';

export default function CardList() {
  const [accountsList, setAccountsList] = useState([]);

  useEffect(() => {
    const getAllAccounts = async () => {
      const user = getStorage('user');
      if (accountsList.length === 0) {
        await axios({
          method: 'GET',
          url: 'http://localhost:3000/users',
          headers: {
            authorization: user.token,
          },
        })
          .then(({ data: { users } }) => {
            setAccountsList(users);
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    };
    getAllAccounts();
  }, [accountsList]);

  return (
    <div className="container row p-3">
      {accountsList && accountsList.map((user) => <Card user={user} key={user.id} />)}
    </div>
  );
}
