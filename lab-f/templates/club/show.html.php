<?php
/** @var \App\Model\Club $club */
/** @var \App\Service\Router $router */

$title = "{$club->getSubject()} ({$club->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $club->getSubject() ?></h1>
    <article>
        <?= $club->getContent();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('club-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('club-edit', ['id'=> $club->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';