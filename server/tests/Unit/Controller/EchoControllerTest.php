<?php
declare(strict_types=1);

namespace Tests\Unit\Controller;

use App\Controller\EchoController;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;

class EchoControllerTest extends TestCase
{
    public function testEcho()
    {
        $controller = new EchoController();
        $response = $controller->echo();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $content = $response->getContent();
        $data = json_decode($content, true);
        $this->assertArrayHasKey('data', $data);
        $this->assertEquals('success', $data['data']);
        $this->assertArrayHasKey('status', $data);
        $this->assertEquals(200, $data['status']);
    }
}