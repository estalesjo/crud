const getTableData = (req, res, client) => {
    client
      .query("SELECT * FROM crud_table ORDER BY date")
      .then(items => {
        res.json(items.rows);
      })
      .catch(err => res.status(400).json({ dbError: "db error" + err}));
  };

  const postTableData = (req, res, client) => {
    const { message, author } = req.body;
    const addedDate = new Date();
    let formattedDate = addedDate.getFullYear() + "-" + (addedDate.getMonth() < 9 ? '0' : '')+ (addedDate.getMonth()+1) + "-" + (addedDate.getDate() < 9 ? '0' : '') + (addedDate.getDate()) + " " +  (addedDate.getHours() < 9 ? '0' : '') + addedDate.getHours() + ":" + (addedDate.getMinutes() < 9 ? '0' : '') + addedDate.getMinutes();
    
    client
        .query("INSERT INTO crud_table (message, author, date) VALUES ($1, $2, $3) RETURNING *", [message, author, formattedDate])
        .then(item => {
          return res.json(item.rows[0]);
        })
        .catch(err =>  res.status(400).json({ dbError: "db error" + err}))
  }

  const updateTableData = (req, res, client) => {
    const { id, message, author } = req.body;
    const updatedDate = new Date();
    let formattedUpdatedDate = updatedDate.getFullYear() + "-" + (updatedDate.getMonth() < 9 ? '0' : '')+ (updatedDate.getMonth()+1) + "-" + (updatedDate.getDate() < 9 ? '0' : '') + (updatedDate.getDate()) + " " + (updatedDate.getHours() < 9 ? '0' : '') + updatedDate.getHours() + ":" + (updatedDate.getMinutes() < 9 ? '0' : '') + updatedDate.getMinutes();

    client
        .query("UPDATE crud_table SET message = $2, author = $3, date = $4 WHERE id = $1 RETURNING *", [id, message, author, formattedUpdatedDate])
        .then(item => {
          return res.json(item.rows[0]);
        })
        .catch(err =>  res.status(400).json({ dbError: "db error" + err}))
      
  }
 
  const deleteTableData = (req, res, client) => {
    const { id } = req.body;
    client
      .query("DELETE FROM crud_table WHERE id = $1", [id],
      error => {
          if(error) {
              res.status(400).json({dbError: 'db error' + error})
          }
          res.json({delete: 'true'})
      })
  }

module.exports = {
    getTableData,
    postTableData,
    updateTableData,
    deleteTableData
}