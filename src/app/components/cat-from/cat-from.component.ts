import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cat, CatsService} from '../../services/cats.service';

@Component({
  selector: 'app-cat-from',
  templateUrl: './cat-from.component.html',
  styleUrls: ['./cat-from.component.scss']
})
export class CatFromComponent implements OnInit {
  @Input() cat: Cat;
  @Input() editMode = true;
  @Output() catUpdated: EventEmitter<Cat> = new EventEmitter<Cat>();

  form: FormGroup;

  constructor(private catsService: CatsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.cat ? this.cat.name : '', Validators.required),
      img: new FormControl(this.cat ? this.cat.img : '', Validators.required),
      description: new FormControl(this.cat ? this.cat.description : '', Validators.required)
    });
  }

  onCatSave() {
    if (this.form.invalid) {
      return;
    }

    this.catUpdated.emit({
      _id: this.cat ? this.cat._id : this.catsService.nextIdValue,
      name: this.form.get('name').value,
      img: this.form.get('img').value,
      description: this.form.get('description').value,
      like: this.cat ? this.cat.like : 0
    });
  }

  onImageLoad(event: Event) {
    const reader = new FileReader();
    const files = event.target['files'];

    if(files && files.length) {
      const [file] = files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          img: reader.result
        });
      };
    }
  }
}
