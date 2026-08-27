import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CreateUser,
  JobRole,
  User
} from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {

  private readonly fb = inject(FormBuilder);

  @Input()
  user: User | null = null;

  @Output()
  save = new EventEmitter<CreateUser | User>();

  @Output()
  cancel = new EventEmitter<void>();

  readonly jobRoles: JobRole[] = [
    'tech',
    'id',
    'gd',
    'qa'
  ];

  readonly userForm =
    this.fb.nonNullable.group({

      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      jobRole: [
        'tech' as JobRole,
        [
          Validators.required
        ]
      ]

    });

  get isEditMode(): boolean {
    return this.user !== null;
  }

  ngOnChanges(): void {

    if (this.user) {

      this.userForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        jobRole: this.user['job-role']
      });

    } else {

      this.userForm.reset({
        username: '',
        email: '',
        jobRole: 'tech'
      });

    }
  }

  onSubmit(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    const formValue =
      this.userForm.getRawValue();

    if (this.user) {

      const updatedUser: User = {
        id: this.user.id,
        username: formValue.username,
        email: formValue.email,
        'job-role': formValue.jobRole
      };

      this.save.emit(updatedUser);

    } else {

      const newUser: CreateUser = {
        username: formValue.username,
        email: formValue.email,
        'job-role': formValue.jobRole
      };

      this.save.emit(newUser);

    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}