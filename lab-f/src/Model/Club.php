<?php
namespace App\Model;

use App\Service\Config;

class Club
{
    private ?int $id = null;
    private ?string $subject = null;
    private ?string $content = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Club
    {
        $this->id = $id;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): Club
    {
        $this->subject = $subject;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): Club
    {
        $this->content = $content;

        return $this;
    }

    public static function fromArray($array): Club
    {
        $club = new self();
        $club->fill($array);

        return $club;
    }

    public function fill($array): Club
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['subject'])) {
            $this->setSubject($array['subject']);
        }
        if (isset($array['content'])) {
            $this->setContent($array['content']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM club';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $clubs= [];
        $clubsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($clubsArray as $clubArray) {
            $clubs[] = self::fromArray($clubArray);
        }

        return $clubs;
    }

    public static function find($id): ?Club
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM club WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $clubArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $clubArray) {
            return null;
        }
        $club = Club::fromArray($clubArray);

        return $club;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO club (subject, content) VALUES (:subject, :content)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'subject' => $this->getSubject(),
                'content' => $this->getContent(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE club SET subject = :subject, content = :content WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':subject' => $this->getSubject(),
                ':content' => $this->getContent(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM club WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setSubject(null);
        $this->setContent(null);
    }
}