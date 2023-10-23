<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use function mysql_xdevapi\getSession;

class ToDoController extends AbstractController
{

    #[Route('/to/do', name: 'app_to_do')]
    public function index(Request $request): Response
    {
        $todo = array(
            'achat' => 'acheter cle usb',
            'cours' => 'finaliser mon cours',
            'correction' => 'corriger mes examens'
        );

        $session = $request->getSession();

        if(!$session->has('todo')){
            $session->set('todo', $todo);
        }

        return $this->render('to_do/index.html.twig');
    }
    #[route('/to/do/add/{cle}/{content}', name:'todo_add')]
    public function addTodo(Request $request,$cle,$content ): Response
    {
        $session = $request->getSession();
        if($session->has('todo')) {
           $todo = $session->get('todo');

           if(isset($todo[$cle])) {
               $this->addFlash('erreur', 'le todo existe deja');
           }else {
               $todo[$cle] = $content;
               $session->set('todo', $todo);
               $this->addFlash('success', 'todo added successfully');
           }
        }
        return $this->render('to_do/index.html.twig');
    }
    #[Route('/to/do/update/{targetCle}/{newContent}', name: 'todo_update')]
    public function updateTodo(Request $request, $targetCle,$newContent) : Response
    {
        $session = $request->getSession();

        if($session->has('todo')) {
            $todo = $session->get('todo');

            foreach ($todo as $cle => $value) {
                if($cle == $targetCle) {
                    $todo[$cle] = $newContent;
                    $session->set('todo', $todo);
                    $this->addFlash('success', 'todo updated');
                }
            }

        }


        return $this->render('to_do/index.html.twig');
    }
    #[Route('/to/do/delete/{targetCle}', name:'todo_delete')]
    public function deleteTodo(Request $request, $targetCle) : Response
    {
        $session = $request->getSession();

        if($session->has('todo')) {
            $todo = $session->get('todo');

            foreach ($todo as $cle => $value) {
                if($cle === $targetCle) {
                    unset($todo[$cle]);
                    $session->set('todo', $todo);
                    $this->addFlash('success', 'todo deleted');
                }
            }
        }

        return $this->render('to_do/index.html.twig');
    }
}
