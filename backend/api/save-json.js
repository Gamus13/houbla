export default function handler(req, res) {
    if (req.method === 'POST') {
      const userInfo = req.body;
      console.log(userInfo); // Vérifiez que les données arrivent
      res.status(200).json({ message: 'Données reçues', data: userInfo });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  