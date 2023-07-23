<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\CreateContactRequest;
use App\Mail\ContactSubmission;
use Illuminate\Http\{RedirectResponse, Response};
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * @param CreateContactRequest $request
     * @return RedirectResponse
     */
    public function __invoke(CreateContactRequest $request): RedirectResponse
    {
        Mail::to(config('app.support_email'))->send(
            new ContactSubmission(
                name: $request->get('name'),
                email: $request->get('email'),
                submittedSubmit: $request->get('subject'),
                body: $request->get('body'),
            )
        );

        return redirect()->back();
    }
}
