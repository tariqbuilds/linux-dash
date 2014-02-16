<?php

class DebianTest extends PHPUnit_Framework_TestCase
{
    public function testIssueReturnsOSName()
    {
        $response = json_decode(MockXhr::get('issue'));
        $this->assertTrue(is_string($response));
        $this->assertEquals(1, preg_match('/^[a-zA-Z]*\z/',$response));
    }
}
