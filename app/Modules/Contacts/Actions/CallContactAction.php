<?php

namespace Modules\Contacts\Actions;

use Illuminate\Support\Facades\Log;
use Modules\Contacts\Models\Contact;

class CallContactAction
{
    public function __invoke(Contact $contact): string
    {
        $possibleOutcomes = [
            'connected',
            'busy',
            'no_answer',
            'failed',
        ];

        $simulatedStatus = $possibleOutcomes[array_rand($possibleOutcomes)];

        switch ($simulatedStatus) {
            case 'connected':
                Log::info("Call to {$contact->name} connected successfully.");
                break;
            case 'busy':
                Log::warning("Call to {$contact->name} failed: Line is busy.");
                break;
            case 'no_answer':
                Log::info("Call to {$contact->name} resulted in no answer.");
                break;
            case 'failed':
            default:
                Log::error("Call to {$contact->name} failed unexpectedly.");
                break;
        }

        return $simulatedStatus;
    }
}
