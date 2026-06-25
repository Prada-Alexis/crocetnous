<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
  exit;
}

$nom     = htmlspecialchars(trim($_POST['nom'] ?? ''));
$prenom  = htmlspecialchars(trim($_POST['prenom'] ?? ''));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$nom || !$prenom || !$email || !$message) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Champs manquants ou invalides']);
  exit;
}

$destinataire = 'prada.alexis7@gmail.com';
$sujet        = "Nouveau message de $prenom $nom — Croc&Nous";
$corps        = "Nom : $prenom $nom\n";
$corps       .= "Email : $email\n\n";
$corps       .= "Message :\n$message";
$headers      = "From: contact@crocetnous.fr\r\n";
$headers     .= "Reply-To: $email\r\n";
$headers     .= "Content-Type: text/plain; charset=UTF-8\r\n";

$envoye = mail($destinataire, $sujet, $corps, $headers);

if ($envoye) {
  echo json_encode(['success' => true]);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Erreur envoi mail']);
}
