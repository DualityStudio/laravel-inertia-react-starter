<?php

namespace App\Http\Controllers\Newsletter;

use App\Http\Controllers\Controller;
use App\Http\Requests\Newsletter\CreateSubscriberRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Spatie\Newsletter\Facades\Newsletter;

class NewsletterController extends Controller
{
    /**
     * @param CreateSubscriberRequest $request
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function __invoke(CreateSubscriberRequest $request): RedirectResponse
    {
        try {
            Newsletter::subscribe($request->get('email'));

            return redirect()->back();
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'email' => __('Your email address already appears to be subscribed.'),
            ]);
        }
    }
}
