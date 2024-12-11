<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Club;
use App\Service\Router;
use App\Service\Templating;

class ClubController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $clubs = Club::findAll();
        $html = $templating->render('club/index.html.php', [
            'clubs' => $clubs,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestClub, Templating $templating, Router $router): ?string
    {
        if ($requestClub) {
            $club = Club::fromArray($requestClub);
            // @todo missing validation
            $club->save();

            $path = $router->generatePath('club-index');
            $router->redirect($path);
            return null;
        } else {
            $club = new Club();
        }

        $html = $templating->render('club/create.html.php', [
            'club' => $club,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $clubId, ?array $requestClub, Templating $templating, Router $router): ?string
    {
        $club = Club::find($clubId);
        if (! $club) {
            throw new NotFoundException("Missing club with id $clubId");
        }

        if ($requestClub) {
            $club->fill($requestClub);
            // @todo missing validation
            $club->save();

            $path = $router->generatePath('club-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('club/edit.html.php', [
            'club' => $club,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $clubId, Templating $templating, Router $router): ?string
    {
        $club = Club::find($clubId);
        if (! $club) {
            throw new NotFoundException("Missing club with id $clubId");
        }

        $html = $templating->render('club/show.html.php', [
            'club' => $club,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $clubId, Router $router): ?string
    {
        $club = Club::find($clubId);
        if (! $club) {
            throw new NotFoundException("Missing club with id $clubId");
        }

        $club->delete();
        $path = $router->generatePath('club-index');
        $router->redirect($path);
        return null;
    }
}